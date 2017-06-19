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
            center : [47.271604, 11.753858],
            zoom : 9
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
		

		
		//GPX Tracks laden
		var gpxKarwendel = omnivore.gpx("bikedata/Karwendel.gpx").addTo(map);
		var gpxPillerseetal = omnivore.gpx("bikedata/Pillerseetal.gpx").addTo(map);
		var gpxMariaWaldrast = omnivore.gpx("bikedata/MariaWaldrast.gpx").addTo(map);
		var gpxKaiserwinkl = omnivore.gpx("bikedata/Kaiserwinkl.gpx").addTo(map);
		var gpxHoheSalve = omnivore.gpx("bikedata/HoheSalve.gpx").addTo(map);
		var gpxMarienbergjoch = omnivore.gpx("bikedata/Marienbergjoch.gpx").addTo(map);
		var gpxGuffertrunde = omnivore.gpx("bikedata/Guffertrunde.gpx").addTo(map);
		var gpxVorderesOetztal = omnivore.gpx("bikedata/VorderesOetztal.gpx").addTo(map);
		
		gpxKarwendel.bindPopup(
        '<h4>Karwendel</h4><a href="touren.html?gpx=Karwendel.gpx">Detailbeschreibung</a>');
		gpxPillerseetal.bindPopup(
        '<h4>Pillerseetal</h4><a href="touren.html?gpx=Pillerseetal.gpx">Detailbeschreibung</a>');
		gpxMariaWaldrast.bindPopup(
        '<h4>MariaWaldrast</h4><a href="touren.html?gpx=MariaWaldrast.gpx">Detailbeschreibung</a>');
		gpxKaiserwinkl.bindPopup(
        '<h4>Kaiserwinkl</h4><a href="touren.html?gpx=Kaiserwinkl.gpx">Detailbeschreibung</a>');
		gpxHoheSalve.bindPopup(
        '<h4>HoheSalve</h4><a href="touren.html?gpx=HoheSalve.gpx">Detailbeschreibung</a>');
		gpxMarienbergjoch.bindPopup(
        '<h4>Marienbergjoch</h4><a href="touren.html?gpx=Marienbergjoch.gpx">Detailbeschreibung</a>');
		gpxGuffertrunde.bindPopup(
        '<h4>Guffertrunde</h4><a href="touren.html?gpx=Guffertrunde.gpx">Detailbeschreibung</a>');
		gpxVorderesOetztal.bindPopup(
        '<h4>VorderesOetztal</h4><a href="touren.html?gpx=VorderesOetztal.gpx">Detailbeschreibung</a>');
	
		

				
}