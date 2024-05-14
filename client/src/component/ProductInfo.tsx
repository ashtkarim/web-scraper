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
        <div style={{ margin: "20px" }}>
            <h1>Product Info</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" >https://www.hollandandbarrett.com</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Paste Url here"
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
                    <p><b>Category:</b> {response.category}</p>
                    <p><b>Manufacturer: </b>{response.Manufacturer}</p>
                    <p><b>Name: </b> {response.name}</p>
                    <p><b>Images: </b>{response.images}</p>
                    <p><b>Price:</b> {response.price}</p>
                    <p><b>Description:</b> {response.description}</p>
                    <p><b>Ingredients: </b>{response.ingredients}</p>
                    <h3>Nutritional Information:</h3>
                    <ul>
                        {Object.entries(response.Nutritional).map(([section, values]) => (
                            <li key={section}>
                                <h4>{section}</h4>
                                <ul>
                                    {Object.entries(values).map(([key, value]) => (
                                        <li key={`${section}-${key}`}>
                                            {`${key} : ${value}`}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProductInfo;
