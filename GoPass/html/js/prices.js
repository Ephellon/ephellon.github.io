/* Price Scheme *
Agency ($: The full display name)
  Area
    Age Group (_.split ";" => *.split ",")
      Ticket Type
*/

var UND, NUL = null,

notices = window.notices = {
  "/": "MON - FRI 9:30 AM to 2:30 PM",
  "*": "* Not all ticket types are offered at reduced prices.",
  child: "Ages 5-14 (reduced fare)",
  disabled: "Requires valid ID (reduced fare)",
  senior: "ages 65+, requires valid ID (reduced fare)"
},

prices = window.prices = {
// Dallas Area Rapid Transit
  DART: {
    Local: {
      0: {
        "2 Hours":      250,
        "Day Pass":     500,
        "Midday/":      175,
        "7 Day Pass":  2500,
        "31 Day Pass": 8000
      },
      1: {
        "2 Hours":      125,
        "Day Pass":     250,
        "Midday/*":     175,
        "7 Day Pass*": 2500,
        "31 Day Pass": 4000
      },
      _: "Adult;Child,Disabled,Senior"
    },

    Regional: {
      0: {
        "2 Hours":       500,
        "Day Pass":     1000,
        "Midday/":       350,
        "7 Day Pass":   5000,
        "31 Day Pass": 16000
      },
      1: {
        "2 Hours":      125,
        "Day Pass":     250,
        "Midday/*":     350,
        "7 Day Pass*": 5000,
        "31 Day Pass": 4000
      },
      _: "Adult;Child,Disabled,Senior"
    },
    $: "Dallas Area Rapid Transit"
  },

// Ft. Worth Transportation Authority
  "The T": {
    Local: {
      0: {
        "Day Pass":     500,
        "7 Day Pass":  2500,
        "31 Day Pass": 8000
      },
      1: {
        "Day Pass":     250,
        "31 Day Pass": 4000
      },
      _: "Adult;Disabled,Senior"
    },

    Regional: {
      0: {
        "Day Pass":     1000,
        "7 Day Pass":   5000,
        "31 Day Pass": 16000
      },
      1: {
        "Day Pass":     250,
        "7 Day Pass*": 5000,
        "31 Day Pass": 4000
      },
      _: "Adult;Child,Disabled,Senior"
    },

    "TRE 1 Z": {},
    $: "Fort Worth Transportation Authority"
  },

// Denton County Transportation Authourity
  DCTA: {
    Local: {
      0: {
        "2 Hours":      300,
        "Day Pass":     600,
        "Midday/":      175,
        "7 Day Pass":  2500,
        "31 Day Pass": 9000
      },
      1: {
        "2 Hours":      125,
        "Day Pass":     250,
        "Midday/*":     175,
        "7 Day Pass*": 2500,
        "31 Day Pass": 4000
      },
      _: "Adult;Child,Disabled,Senior"
    },

    Regional: {
      0: {
        "2 Hours":       500,
        "Day Pass":     1000,
        "Midday/":       350,
        "7 Day Pass":   5000,
        "31 Day Pass": 16000
      },
      1: {
        "2 Hours":      125,
        "Day Pass":     250,
        "Midday/*":     350,
        "7 Day Pass*": 5000,
        "31 Day Pass": 4000
      },
      _: "Adult;Child,Disabled,Senior"
    },

    Connect: {
      0: {
        "31 Day Pass": 4500
      },
      1: {
        "31 Day Pass": 2500
      },
      _: "Adult;Child,Disabled,Senior"
    }
  },
  $: "Denton County Transportation Authority"
};