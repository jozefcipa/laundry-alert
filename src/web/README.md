# Web application (PWA)

The web is a [PWA](https://web.dev/learn/pwa/progressive-web-apps), so after installing it on a phone (Add to Home Screen) it supports push notifications.
When the app is loaded, it sends a request to `192.168.0.100` to check whether the [Control unit](../api/README.md) is available.
If the API responds, the app shows the current state of the washing process and also a button for subscribing to push notifications.
The app registers a service worker that is processing the incoming notifications.
Once the washing is done, the Control unit sends a push notification and the phone displays it.

## Deployment
The app is deployed to [laundry.iot.jozefcipa.com](https://laundry.iot.jozefcipa.com/) and is hosted on [Vercel](https://vercel.com/).