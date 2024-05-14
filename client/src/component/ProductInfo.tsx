import React, { useState } from 'react';

interface ApiResponse {
    category: string;
    Manufacturer: string;
    name: string;
    images: string;
    price: string;
    description: string;
    ingredients: string;
    Nutritional: {
        [key: string]: {
            [key: string]: string;
        };
    };
}

const ProductInfo: React.FC = () => {
    const [link, setLink] = useState('');
    const [response, setResponse] = useState<ApiResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLink(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const apiUrl = `http://4.233.16.88:4000/product?url=${link}`;
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data: ApiResponse = await response.json();
            setResponse(data);
            setError(null);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data. Please try again later.');
            setResponse(null);
        }
    };

    return (
        <div style={{margin:"20px"}}>

            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="past Url here" 
                        aria-label="Paste Url here" 
                        aria-describedby="basic-addon2"
                        onChange={handleChange} 
                        value={link}
                    />
                    <div className="input-group-append">
                        <button 
                        className="btn btn-outline-secondary" 
                        type="submit"
                        
                    >Button</button>
                    </div>
                </div>

            </form>





            
            {error && <p>{error}</p>}
            {response && (
                <div>
                    <h2>Product Details:</h2>
                    <p>Category: {response.category}</p>
                    <p>Manufacturer: {response.Manufacturer}</p>
                    <p>Name: {response.name}</p>
                    <p>Images: {response.images}</p>
                    <p>Price: {response.price}</p>
                    <p>Description: {response.description}</p>
                    <p>Ingredients: {response.ingredients}</p>
                    <h3>Nutritional Information:</h3>
                    <ul>
                        {Object.entries(response.Nutritional['Per 2 Capsules %NRV*']).map(([key, value]) => (
                            <li key={key}>
                                {key}: {value}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProductInfo;
