# Voodoo
### It's a kind of magic

![logo](https://raw.githubusercontent.com/Jungle-Bus/resources/master/logo/Logo_Jungle_Bus-Voodoo.png)

This is a small tool to help you map bus routes faster.

It takes a GPS track from a bus trip (created for instance with [Jungle Bus layouts for OSM Tracker](https://github.com/Jungle-Bus/osmtracker-layouts) and uploaded to [openstreetmap.org](https://www.openstreetmap.org/traces/tag/bus%20route)) and turn it to a set of ways that can be used to create a route relation in JOSM.

Under the hood, it uses [Valhalla mapmatching API](https://valhalla.readthedocs.io/en/latest/api/map-matching/api-reference/) with a bus profile to guess the exact ways taken by the vehicle.

### All magic comes with a price  :dizzy:

Don't trust blindly the tool and check it with the initial track.

 The result will highly depends on the precision of the GPS and the quality of the road network mapping (bus lanes, oneways, etc).

There may be mistakes in the selected ways but also holes (gaps occurs when ways have be cutted recently) or ways that need to be cut.  :warning: To avoid to create gaps in already existing relations, please always make sure to **download parent elements of the ways in JOSM before you cut them**.

For even more witchery, don't forget to check your final bus route relation with [PT assistant plugin](https://wiki.openstreetmap.org/wiki/JOSM/Plugins/PT_Assistant) and [Jungle Bus validation rules](https://github.com/Jungle-Bus/transport_mapcss/blob/master/README.md) :sparkles:
