#! /usr/bin/env python

import sys

# -- Airline Data
# Year, Month, DayofMonth, DayOfWeek, DepTime, CRSDepTime, ArrTime, CRSArrTime, UniqueCarrier, FlightNum,
# TailNum, ActualElapsedTime, CRSElapsedTime, AirTime, ArrDelay, DepDelay, Origin, Dest, Distance, TaxiIn,
# TaxiOut, Cancelled, CancellationCode, Diverted, CarrierDelay, WeatherDelay, NASDelay, SecurityDelay, LateAircraftDelay

for line in sys.stdin:
    line = line.strip()
    unpacked = line.split(",")
    Year, Month, DayofMonth, DayOfWeek, DepTime, CRSDepTime, ArrTime, CRSArrTime, UniqueCarrier, FlightNum, TailNum, ActualElapsedTime, CRSElapsedTime, AirTime, ArrDelay, DepDelay, Origin, Dest, Distance, TaxiIn,TaxiOut, Cancelled, CancellationCode, Diverted, CarrierDelay, WeatherDelay, NASDelay, SecurityDelay, LateAircraftDelay = line.split(",")
    if TaxiIn == "NA" or ArrDelay == "NA":
        continue
    value = float(TaxiIn) + float(ArrDelay)
    key = "-".join([UniqueCarrier, Dest])
    results = [key, value]
    print("\t".join(results))