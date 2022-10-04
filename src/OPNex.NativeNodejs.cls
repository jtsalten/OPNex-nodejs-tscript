Class OPNex.NativeNodejs Extends (%Persistent, %Populate)
{

Property cod As %Integer;

Property description As %String(MAXLEN = "");

/// Utiliza la librería de Python geopy previamente importada en IRIS
ClassMethod GeoLocator(pDireccion As %String = "") As %String
{
     set geopy = ##class(%SYS.Python).Import("geopy")
     set args = {"user_agent":"Embedded Python"}
     set geolocator = geopy.Nominatim(args...)

     set tDir = geolocator.geocode(pDireccion)

     return tDir.address
}

ClassMethod Distance(pOrigin As %String, pDestination As %String) As %Decimal [ Language = python ]
{
     import iris
     from geopy.geocoders import Nominatim 
     from geopy.distance import geodesic

     geolocator = Nominatim(user_agent="My Embedded Python App")

     locOrig = geolocator.geocode(pOrigin)
     locDest = geolocator.geocode(pDestination)

     orig = (locOrig.latitude,locOrig.longitude)
     dest = (locDest.latitude,locDest.longitude)

     route = geodesic(orig,dest)

     #return route.miles

     return iris.cls('OPNex.NativeNodejs').milesToKM(route.miles)
}

ClassMethod milesToKM(pMiles As %Decimal = 0) As %Decimal
{
     //write "hello"
     return pMiles * 1.609344
}

ClassMethod cmBoolean(cm1 As %Integer, cm2 As %Integer) As %Boolean
{
     Quit (cm1=cm2)
}

ClassMethod cmBytes(cm1 As %Integer, cm2 As %Integer, cm3 As %Integer) As %Binary
{
     Quit $CHAR(cm1,cm2,cm3)
}

ClassMethod cmString(cm1 As %String) As %String
{
     Quit "Hello "_cm1
}

ClassMethod cmLong(cm1 As %Integer, cm2 As %Integer) As %Integer
{
     Quit cm1+cm2
}

ClassMethod cmDouble(cm1 As %Double) As %Double
{
     Quit cm1 * 1.5
}

ClassMethod cmVoid(cm1 As %Integer)
{
     Set ^cmGlobal=cm1
     Quit
}

ClassMethod cmList(cm1 As %String, cm2 As %Integer)
{
     Set list = $LISTBUILD(cm1,cm2)
     Quit list
}

Storage Default
{
<Data name="NativeNodejsDefaultData">
<Value name="1">
<Value>%%CLASSNAME</Value>
</Value>
<Value name="2">
<Value>cod</Value>
</Value>
<Value name="3">
<Value>description</Value>
</Value>
</Data>
<DataLocation>^OPNex.NativeNodejsD</DataLocation>
<DefaultData>NativeNodejsDefaultData</DefaultData>
<IdLocation>^OPNex.NativeNodejsD</IdLocation>
<IndexLocation>^OPNex.NativeNodejsI</IndexLocation>
<StreamLocation>^OPNex.NativeNodejsS</StreamLocation>
<Type>%Storage.Persistent</Type>
}

}
