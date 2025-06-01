export async function getProvinces(provincePayload) {
  try {
    const response = await fetch('http://localhost:8081/location/province', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(provincePayload), 
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.data || data;
  } catch (error) {
    console.error('Failed to fetch provinces:', error);
    throw error;
  }
}


export async function getDistrict(id){
      try {
    const response = await fetch('http://localhost:8081/location/district/'+id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: '', 
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.data || data;
  } catch (error) {
    console.error('Failed to fetch provinces:', error);
    throw error;
  }
}


export async function getLocalLevel(id){
    try {
    const response = await fetch('http://localhost:8081/location/locallevel/'+id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: '', 
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.data || data;
  } catch (error) {
    console.error('Failed to fetch provinces:', error);
    throw error;
  }

}