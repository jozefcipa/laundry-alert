This works as a redirecter to the washing machine control website.
Its purpose is to prevent having an empty screen on the mobile webapp, when connected to a different network where the website is not accessible.
Instead, this website will be loaded on `pracka.iot.jozefcipa.com` and if it finds local IP address of the device, it will redirect there, otheriwse it will just show an error message.