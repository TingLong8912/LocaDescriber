

# LocaDescriber: Semantic Reverse Geocoding System

A system that performs **semantic reverse geocoding** by generating human-readable location descriptions such as:

> “X is north of Y”

Given geographic coordinates, this system infers spatial relationships, determines relevant contextual reference objects, and returns a natural language location description.

---


## URL

Project Website: [https://locadescriber.sgis.tw](https://locadescriber.sgis.tw)

## About

This project was developed as part of a **master’s thesis** at the **Department of Geography, National Taiwan University**. It integrates:

- Ontology (based on DOLCE)
- Spatial analysis
- SWRL-based semantic inference

to produce **context-aware**, **referent-sensitive** semantic location descriptions.

---

## Keywords

- WebGIS  
- Ontology-based WebGIS  
- Knowledge Graph Visualization  
- Semantic Reverse Geocoding  

---

## Tech Stack

### Front-end

- **Next.js (React)**
- **Tailwind CSS**, **Radix UI**, **Lucide Icons**
- **Framer Motion** – animation
- **OpenLayers**, **Leaflet**, **React Flow** – spatial and graph rendering

### Back-end

- **Flask** – [semantic reasoning API (Python)](https://github.com/TingLong8912/spatial-operations.git)
- **Node.js** – [spatial relation API (JavaScript)](https://github.com/TingLong8912/ontology-based-reverse-geocoding.git)
- **PostgreSQL** – geospatial data storage
- **Turf.js** – spatial operations

---

## Features

- Semantic location descriptions based on spatial ontology
- Spatial relation computation (e.g. `Within`, `Touches`, `Equals`, `Azimuth`)
- Context-sensitive reasoning with dynamic referent selection
- Knowledge graph visualization (React Flow)
- Real-time map interaction with OpenLayers / Leaflet

---

