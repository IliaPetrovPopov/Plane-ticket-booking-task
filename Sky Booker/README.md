# Sky Booker

Sky Booker uses API to receive certain number of airports. 

It does request to the same API, in order to create new bookings, delete certain one or get bookings. If any bookings are added, the api requests 5, by default and upon scrolling to the bottom of the page, a new request is made for another 5 (if there are more than 5 bookings in the API).

Upon adding new booking there is no new request made, but instead the booking is send to the bottom of the bookings list. When the page is refreshed, everything comes into place and that booking goes to the end of the bookings array. This can be improved.

Tests are made about every part of the app, except for the deletion of booking.

## Installation

To install the project, use the following command:

```bash
npm install
```

## Usage

To run the project, use the following command:

```bash
npm run dev
```

To test the project, use the following command:

```bash
npm run test
```
## Features

- Add Booking: Form, which serves purpose for creating new bookings. It has input fields for first & last name, departure & arrival airports, departure & return dates. The adding is done via button, which, when clicked, saves the booking in the API and adds the booking to the state.
  
- List Bookings: Lists all the bookings, upon requesting them. The request URL has query parameters, which tell how much bookings should be send per request. They are set to the default value - 5.
  
- Delete Booking: Delete button, which deletes certain booking and re-renders the state.

