import React, { useEffect, useState } from "react";

function EIA_COAL() {
    const [data, setData] = useState(null);
    const [csvData, setCsvData] = useState("");

    useEffect(() => {
        fetch("https://api.eia.gov/v2/coal/consumption-and-quality/data/?frequency=annual&data[0]=consumption&facets[location][]=AK&facets[location][]=AL&facets[location][]=AR&facets[location][]=AZ&facets[location][]=CA&facets[location][]=CO&facets[location][]=CT&facets[location][]=DC&facets[location][]=DE&facets[location][]=FL&facets[location][]=GA&facets[location][]=HI&facets[location][]=IA&facets[location][]=ID&facets[location][]=IL&facets[location][]=IN&facets[location][]=KS&facets[location][]=KY&facets[location][]=LA&facets[location][]=MA&facets[location][]=MD&facets[location][]=ME&facets[location][]=MI&facets[location][]=MN&facets[location][]=MO&facets[location][]=MS&facets[location][]=MT&facets[location][]=NC&facets[location][]=ND&facets[location][]=NE&facets[location][]=NEW&facets[location][]=NH&facets[location][]=NJ&facets[location][]=NM&facets[location][]=NV&facets[location][]=NY&facets[location][]=OH&facets[location][]=OK&facets[location][]=OR&facets[location][]=PA&facets[location][]=RI&facets[location][]=SC&facets[location][]=SD&facets[location][]=TN&facets[location][]=TX&facets[location][]=US&facets[location][]=UT&facets[location][]=VA&facets[location][]=VT&facets[location][]=WA&facets[location][]=WI&facets[location][]=WV&facets[location][]=WY&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5000&api_key=Ajquf3CRxCMt5YNreMhTDYa3RFpX7umsDFrUnE2m")
            .then((response) => response.json())
            .then((response) => {
                setData(response);
                const csv = jsonToCsv(response.response.data);
                setCsvData(csv);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const jsonToCsv = (json) => {
        if (json.length === 0) return "";
        const fields = Object.keys(json[0]);
        const replacer = (key, value) => (value === null ? "" : value);
        const csv = json.map((row) => 
            fields.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(',')
        );
        csv.unshift(fields.join(',')); // add header column
        return csv.join('\r\n');
    };

    return (
        <div>
            <h1>My EIA Coal Data</h1>
            <h2>CSV Data</h2>
            <pre>{csvData}</pre>
        </div>
    );
}

export default EIA_COAL;
