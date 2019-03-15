# MMM-EventProxy

## Synopsis
`MMM-EventProxy` is a MagicMirror² Module which can be used to create custom notifications which can trigger one or more other notifications.

## Usage Scenario

Many MagicMirror² modules can be configured to send a notification event when a certain criteria is met.  However, in some scenarios it may be desirable to send more than one notification when this criteria is met.  `MMM-EventProxy` can be used to achieve this.

## Configuration

Configuration of `MMM-EventProxy` is relatively straight-forward:
````javascript
{
    module: 'MMM-EventProxy',
    config: {
        'CUSTOM_EVENT1': [
                {
                        notification: "NOTIFICATION_A",
                        payload: "PAYLOAD_A"
                },
                {
                        notification: "NOTIFICATION_B",
                        payload: "PAYLOAD_B"
                }
                ...
        ],
        ...
    }
}
````
This will cause `MMM-EventProxy` to listen for the notification `CUSTOM_EVENT1`.  Whenever this notification event is received, `MMM-EventProxy` will send two new notification events with the specified payloads.

## Example

This example assumes the following setup:

1. The `MMM-pages` module has been used to define multiple pages
2. The first page contains an instance of the `clock` module
3. The second page contains an instance of the `MMM-SimpleLogo` module
4. The `alert` module is activated to show user notifications

````javascript
modules: [
    {
        module: "clock",
        position: "middle_center"
    },
    {
        module: 'MMM-SimpleLogo',
        position: 'middle_center',
        config: {
                fileUrl: "cat.jpg",
                width: '750px',
        }
    },
    {
        module: "alert",
        config: {
            display_time: 2000,
            position: "left"
        }
    },
    {
        module: 'MMM-pages',
        config: {
            modules: [ ["clock" ], ["MMM-SimpleLogo"], ]
        }
    },
    ...
]
````
The configuration below will define 2 custom notifications:

1. Perform the following actions upon receiving the custom notification `SHOW_CAT`:
   * Switch `MMM-pages` to the second page
   * Display `cat.jpg` in `MMM-SimpleLogo`
   * Send the message notification `Meow` to the `alert` module
2. Perform the following actions upon receiving the custom notification `SHOW_DOG`:
   * Switch `MMM-pages` to the second page
   * Display `dog.jpg` in `MMM-SimpleLogo`
   * Send the message notification `Woof` to the `alert` module

````javascript
    {
        module: 'MMM-EventProxy',
        config: {
            'SHOW_CAT': [
                {
                    notification: "PAGE_CHANGED",
                    payload: 1
                },
                {
                    notification: "SIMPLE_LOGO_UPDATE",
                    payload: {
                        fileUrl: "cat.jpg",
                        width: '700px'
                    }
                },
                {
                    notification: "SHOW_ALERT",
                    payload: {
                        title: "Meow",
                        type: "notification"
                    }
                }
            ],
           'SHOW_DOG': [
                {
                    notification: "PAGE_CHANGED",
                    payload: 1
                },
                {
                    notification: "SIMPLE_LOGO_UPDATE",
                    payload: {
                        fileUrl: "dog.jpg",
                        width: '500px'
                    }
                },
                {
                    notification: "SHOW_ALERT",
                    payload: {
                        title: "Woof",
                        type: "notification"
                    }
                }
            ],
        }
    }
````
The `MMM-OnScreenMenu` module can be used to test this setup.  First, make sure that the menu will be shown on each page by including the following option in the configuration of `MMM-pages`:
````javascript
    {
        module: 'MMM-pages',
        config: {
            modules: [ ["clock" ], ["MMM-SimpleLogo"], ],
            fixed: [ "MMM-OnScreenMenu" ]
        }
    }
````
Then configure the `MMM-OnScreenMenu` module as follows:
````javascript
    {
        module: 'MMM-OnScreenMenu',
        position: 'top_left',
        config: {
            enableKeyboard: true,
            menuItems: {
                notify1: {
                    title: "Show Clock",
                    notification: "PAGE_CHANGED",
                    payload: 0,
                },
                notify2: {
                    title: "Show Cat",
                    notification: "SHOW_CAT",
                },
                notify3: {
                    title: "Show Dog",
                    notification: "SHOW_DOG",
                },
            },
        }
    }

````

## License

`MMM-EventProxy` is licensed under verison 3 of the GNU Public License.
