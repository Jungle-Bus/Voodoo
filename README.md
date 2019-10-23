# Voodoo
### It's a kind of magic

![logo](https://raw.githubusercontent.com/Jungle-Bus/resources/master/logo/Logo_Jungle_Bus-Voodoo.png)

This is a small tool to help you map bus routes faster.

It takes a GPS track from a bus trip (created for instance with [Jungle Bus layouts for OSM Tracker](https://github.com/Jungle-Bus/osmtracker-layouts) and uploaded to [openstreetmap.org](https://www.openstreetmap.org/traces/tag/bus%20route)) and turn it to a set of ways that can be used to create a route relation in JOSM.

Under the hood, it uses [Valhalla mapmatching API](https://valhalla.readthedocs.io/en/latest/api/map-matching/api-reference/) with a bus profile to guess the exact ways taken by the vehicle.
