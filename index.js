
var valhalla_attributes_as_json = {
    "shape": [],
    "costing": "bus",
    "directions_options": {
        "units": "miles"
    },
    "shape_match": "map_snap",
};

function GPX_to_JOSM() {
    var trace_id = document.getElementById("input_track").value;
    if (!trace_id) {
        trace_id = 3130292;
    }

    var osm_trace_url = `https://www.openstreetmap.org/api/0.6/gpx/${trace_id}/data`
    var osm_trace_url_for_josm = `https://www.openstreetmap.org/trace/${trace_id}/data`

    var check_input = new Promise(function(resolve, reject) {
        if (isNaN(trace_id)) {
            reject(Error("The input should be the id of a GPS track on openstreetmap.org (for instance 3130292)"));
        }
        var gpxlink = document.getElementById('gpx_link');
        gpxlink.innerHTML = `<a class="button result"  href="http://localhost:8111/import?new_layer=true&upload_policy=never&url=${osm_trace_url_for_josm}" target="_blank">Load GPX in JOSM</a>`

        resolve(trace_id);
    });

    check_input.then(function(){
            return fetch(osm_trace_url, {
                headers: {
                    'Authorization': auth
                },
            })}
        )
        .then(r => r.text())
        .then(function(response) {
            if (typeof(response) === "string") {
                return response;
            } else {
                var s = new XMLSerializer();
                var str = s.serializeToString(response);
                return str;
            }
        })
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        /*.then(data => console.log(data))*/
        .then(function(data) {
            let trackpoints = [];
            let timepoints = [];
            var trks = [].slice.call(data.querySelectorAll('trk'));
            for (let idx in trks) {
                var trk = trks[idx];
                var trkpts = [].slice.call(trk.querySelectorAll('trkpt'));
                for (let idxIn in trkpts) {
                    var trkpt = trkpts[idxIn];
                    let pt = {};
                    pt.lat = parseFloat(trkpt.getAttribute("lat"));
                    pt.lon = parseFloat(trkpt.getAttribute("lon"));
                    trackpoints.push(pt);
                    var times = [].slice.call(trkpt.querySelectorAll('time'));
                    timepoints.push(new Date(times[0].innerHTML));
                }
            }
            let timediff = (timepoints[timepoints.length-1].getTime()-timepoints[0].getTime()) / 1000
            let duration = Math.round(timediff/60)
            var track_metadata = document.getElementById('track_metadata');
            track_metadata.innerText = "track duration in minutes : " + duration

            return trackpoints
        })
        .then(data => {
            valhalla_attributes_as_json.shape = data;
            return JSON.stringify(valhalla_attributes_as_json)
        })
        .then(function(body) {
            return fetch(valhalla_trace_attributes_url, {
                method: "POST",
                body: body
            })

        })
        .then(r => r.json())
        .then(function(valhalla_response) {
            if (valhalla_response.error_message === "error") {
                throw "Error on mapmatching";
            }
            edges = valhalla_response.edges
            var josm_url = "http://localhost:8111/load_object?objects="
            for (var i = 0; i < edges.length; i++) {
                josm_url += "w" + edges[i]['way_id'].toString() + ","
            }
            return josm_url;
        })
        .then(function(josm) {
            var link = document.getElementById('josm_link');
            link.innerHTML = `<a  class="button result" href="${josm}" target="_blank">Select route in JOSM</a>`
        }).catch(function(error) {
            console.error('Error:', error);
            var errors = document.getElementById('errors');
            errors.innerText = "Oops, something wrong happens! \n" + error
        });
}
