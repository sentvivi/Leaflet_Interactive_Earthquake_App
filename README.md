# Leaflet_Interactive_Earthquake_App
Overview

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

This activity are broken into two parts

    Part 1: Earthquake Visualization
    The objective is to visualize an earthquake dataset:
        1. Retrieve the Dataset:  
            Obtain earthquake data from the USGS, available in various formats and updated every 5 minutes. Access the USGS GeoJSON Feed page and select a dataset for visualization. Source from USGS GeoJSON Feed (http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page. 
        2. Import and Visualize Data:
            Utilize Leaflet to create a map that displays all earthquakes from the dataset by their longitude and latitude. Create markers that represent earthquake magnitudes using their size and color to indicate earthquake depth. Larger markers will denote higher magnitudes, while darker colors will signify greater depth.
                
![Alt Text](result/StreetView.PNG)

    Part 2: Additional Data Gathering and Visualization
        Plot a secondary dataset on the map to showcase the correlation between tectonic plates and seismic activity. This requires integrating this dataset alongside the original one. Incorporate other base maps for selection. Organize each dataset into distinct overlays that can be independently toggled. Add layer controls to the map interface, allowing selection between satellite, outdoor, and topoview, with overlay checkboxes for both the tectonic plates and earthquakes datasets. 

![Alt Text](result/satelliteView.PNG)

![Alt Text](result/OutdoorView.PNG)

![Alt Text](result/topoView.PNG)

The websit for part 1: 

The website for part 2 (required token):
    To include the necessary token, create a config.js file containing the following code:
        const apiKey = 'Your Token';
        Replace 'Your Token' with the actual token required from https://api.mapbox.com/
