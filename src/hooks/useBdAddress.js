import { useEffect, useState } from "react";

const useBdAddress = () => {
    const [districts, setDistricts] = useState([]);
    const [allData, setAllData] = useState([])

    useEffect(() => {
        fetch('/address.json')
        .then((response) => response.json())
        .then((data) => {
            setAllData(data.districts)
            const updatedDistricts = data.districts.map((districtName) => ({
                name: districtName.name,
                id: districtName.id
            }));
            
            setDistricts(updatedDistricts);
        })
        .catch((error) => {
            console.error('Error fetching address:', error);
        });
    }, []);

    const getUpozilla = (districtName) => {
        const upozillas = allData.find((district) => district.name === districtName)?.upazilas;
        return upozillas;
    }

    return { districts, getUpozilla };
};

export default useBdAddress;
