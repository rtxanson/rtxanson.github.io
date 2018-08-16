#!/bin/zsh

# hennepin 27;Hennepin;422

# EPSG:3310 California Albers
PROJECTION='d3.geoMercator()'
# PROJECTION='d3.geoAlbers().parallels([34, 40.5]).rotate([120, 0])'
# PROJECTION='d3.geoAlbersUsa()'

# The state FIPS code.
STATE=06

# The ACS 5-Year Estimate vintage.
YEAR=2014

# The display size.
WIDTH=960
HEIGHT=1100

echo "boop"
rm -rf results.cleaned.json beep.json beep.boop.json topo.json

ndjson-cat results.json \
   | ndjson-map ' d.data[0] ' \
   | ndjson-split \
   | ndjson-filter " d['County-Precinct'].search('Hennepin') > -1 " \
   | ndjson-map " d.name = d['County-Precinct'].split(': ')[1], d " \
   | ndjson-map " d.name = d.name.replace(' W-0', ' W-').replace(' P-0', ' P-'), d " \
   | ndjson-reduce \
   > results.cleaned.json


ndjson-cat geo.json \
    | geoproject "${PROJECTION}.fitSize([${WIDTH} / 1.5, ${HEIGHT} / 1.5], d)" \
    > test.json

ndjson-cat geo.json \
    | geoproject "${PROJECTION}.fitSize([${WIDTH} / 1.5, ${HEIGHT} / 1.5], d)" \
    | ndjson-split 'd.features' \
    | ndjson-map 'd.properties.name = d.properties.MUNIC_NAME + " W-" + d.properties.WARD + " P-" + d.properties.PRECINCT, d' \
    | ndjson-reduce \
    > beep.json

ndjson-join 'd.name' 'd.properties.name' \
        <(ndjson-cat results.cleaned.json | ndjson-split ) \
        <(ndjson-cat beep.json | ndjson-split ) \
    | ndjson-map "d[1].properties.p = d[0], d[1]" \
    | ndjson-reduce 'p.features.push(d), p' '{type: "FeatureCollection", features: []}' \
    > beep.boop.json


 
geo2topo \
   districts=beep.boop.json \
   county=test.json \
   | toposimplify -p 1 -f \
   > topo.json

# topo2geo \
#   < topo.json \
#   districts=districts.json \
#   county=county.json

# geo2topo \
#   districts=districts.json \
#   county=county.json \
#   | topoquantize 1e5 \
#   > topo.json

ls -lah topo.json

echo "bip"

