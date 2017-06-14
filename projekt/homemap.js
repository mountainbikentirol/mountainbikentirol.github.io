window.onload = function() { 
	
	
        // WMTS-Layer basemap.at - Quelle: http://www.basemap.at/wmts/1.0.0/WMTSCapabilities.xml
        var layers = {
            geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
                subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
            }),
            bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
                subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
            }),
            bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
                subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
            }),
            bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
                subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
            }),
            bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
                subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
            }),
            osm: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                subdomains: ['a', 'b', 'c'],
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            })
        };

        // Karte definieren
        var map = L.map('map', {
            layers: [layers.geolandbasemap],
            center : [47.654, 13.370],
            zoom : 8
        });

        // Maßstab hinzufügen
        L.control.scale({
            maxWidth: 200,
            metric: true,
            imperial: false
        }).addTo(map);
		

        // WMTS-Layer Auswahl hinzufügen
        var layerControl = L.control.layers({
            "basemap.at - STANDARD": layers.geolandbasemap,
            "basemap.at - GRAU": layers.bmapgrau,
            "basemap.at - OVERLAY": layers.bmapoverlay,
            "basemap.at - HIGH-DPI": layers.bmaphidpi,
            "basemap.at - ORTHOFOTO": layers.bmaporthofoto30cm,
            "OpenStreetMap": layers.osm,
        }).addTo(map);

        // leaflet-hash aktivieren
        var hash = new L.Hash(map);
		
		
		function loadTrack(track) {
		// GPX Track laden
			gpxTrack = omnivore.gpx('bikedata/'+track).addTo(map);
		}
		
		// ROUTEN FUNKTIONIEREN NICHT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		
		//Etappe laden (erfüllt gleiche Funktion wie "GPX Track laden" eins weiter unten)
		//L.geoJSON(window.Karwendel.gpx).addTo(map);
		//L.geoJSON(window.Pillersee.gpx).addTo(map);
		//L.geoJSON(window.MariaWaldrast.gpx).addTo(map);
		//L.geoJSON(window.Kaiserwinkl.gpx).addTo(map);
		//L.geoJSON(window.HoheSalve.gpx).addTo(map);
		//L.geoJSON(window.Marienbergjoch.gpx).addTo(map);
		//L.geoJSON(window.Guffertrunde.gpx).addTo(map);
		//L.geoJSON(window.VorderesOetztal.gpx).addTo(map);
		
		//var mtb = L.geoJSON(window.bikedata).addTo(map);
		
		
					  
				
			gpxTrack.on("ready", function() {
				
				// Höhenprofil erzeugen
				profil.clear();
				gpxTrack.eachLayer(function(layer) {
					profil.addData(layer.feature);
			
					
					var pts = layer.feature.geometry.coordinates;
				
					for (var i = 1; i< pts.length; i+= 1){
					
				
						// Entfernung bestimmen
						var dist = map.distance (
							[ pts[i][1],pts[i][0] ],
							[ pts[i-1][1],pts[i-1][0] ]
						).toFixed(0);
						
				
						var delta = pts[i][2] - pts[i-1][2];
						
					
						var rad= Math.atan(delta/dist);
						var deg = rad * (180 / Math.PI).toFixed(1); 
						

						
						var farbe;
						switch(true) { 
							case (deg >= 20) :  farbe = "#bd0026"; break;
							case (deg >= 15) :  farbe = "'#f03b20"; break;
							case (deg >= 10) :  farbe = "#fd8d3c"; break;
							case (deg >= 5)  :  farbe = "#feb24c"; break;
							case (deg >= 1)  :  farbe = "#fed976"; break;
							case (deg >= -1) :  farbe = "yellow"; break;
							case (deg >= -5) :  farbe = "#d9f0a3"; break;
							case (deg >=-10) :  farbe = "#addd8e"; break;
							case (deg >=-15) :  farbe = "#78c679"; break;
							case (deg >= -20):  farbe = "#31a354"; break;
							case (deg < -20) :  farbe = "#006837"; break;
						}
					
						
					
						var pointA = new L.LatLng(pts[i][1],pts[i][0]);
						var pointB = new L.LatLng(pts[i-1][1],pts[i-1][0]);
						var pointList = [pointA, pointB];
		   
						var firstpolyline = new L.Polyline(pointList, {
							color: farbe,
							weight: 6,
							opacity: 0.5,
							smoothFactor: 1

						});
			
						firstpolyline.addTo(map);
					
					map.fitBounds(gpxTrack.getBounds());
					
					}
				});
			});
		
			
		
		var start = [
		L.marker([47.392285, 11.267306], {title: "Startpunkt Karwendelrunde", icon: L.icon({iconUrl: 'icons/start-race-2.png'})}),
		L.marker([47.476926, 12.544588], {title: "Startpunkt Pillersee-Runde", icon: L.icon({iconUrl: 'icons/start-race-2.png'})}),
		L.marker([47.263363, 11.400469], {title: "Startpunkt Maria Waldrast-Runde", icon: L.icon({iconUrl: 'icons/start-race-2.png'})}),
		L.marker([47.668861, 12.404069], {title: "Startpunkt Kaiserwinkl-Runde", icon: L.icon({iconUrl: 'icons/start-race-2.png'})}),
		L.marker([47.446109, 12.162167], {title: "Startpunkt Hohe Salve-Runde", icon: L.icon({iconUrl: 'icons/start-race-2.png'})}),
		L.marker([47.319768, 10.830670], {title: "Startpunkt Marienbergjoch-Runde", icon: L.icon({iconUrl: 'icons/start-race-2.png'})}),
		L.marker([47.536660, 11.913398], {title: "Startpunkt Guffertrunde", icon: L.icon({iconUrl: 'icons/start-race-2.png'})}),
		L.marker([47.198614, 10.902923], {title: "Startpunkt Runde im vorderen Ötztal", icon: L.icon({iconUrl: 'icons/start-race-2.png'})})
		];
		var startLayer = L.featureGroup();
		for (var i=0; i<start.length; i++) {
		startLayer.addLayer(start[i]); 
		};
		
				
}