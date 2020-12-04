# Weather demo - Test APP (React, Redux, GraphQL)

Demo project react / graphql
Use typescript on frontend
Start a project from Create React app.

Use Redux toolkit ​https://redux-toolkit.js.org/
Use this graphql endpoint ​https://graphql-weather-api.herokuapp.com/​.

You should have ​2 components in 2 separate files​, one with search input and unit selection (​metric, imperial, kelvin​) where you can search for a city, and one where you display the weather info. When the user search for a city you should dispatch a redux action (createAsyncThunk) and put received data in store.
The component who displays the weather information should show a loading state until the data is received.
You can have more files (to configure the store for example) but those components should be splitted in at least 2 files.

To fetch data from graphql endpoint you can use https://github.com/prisma-labs/graphql-request​, @apollo/client or any library you like

You can get details for a city with a query like this:
   
# Write your query or mutation here {
getCityByName(name:"Oradea", config:{units:metric}) { country
weather {
temperature { actual feelsLike min
max }
summary { title
description
} wind {
speed
deg }
clouds { all
visibility
humidity }
} }
}

Estimate time:​ 4 hours
