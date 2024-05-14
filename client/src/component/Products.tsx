import React, { useState, useEffect } from 'react';

interface Product {
  link: string;
  name: string;
}

const Products: React.FC = () => {
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); 

    try {
      const res = await fetch(`http://4.233.16.88:4000/products?url=${url}`);
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data: Product[] = await res.json();
      setResponse(data);
      console.log(data);
    } catch (error) {
      console.error('Error scraping URL:', error);
    } finally {
      setIsLoading(false); 
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
                    onChange={(e) => setUrl(e.target.value)} 
                    value={url}
                />
                <div className="input-group-append">
                    <button 
                    className="btn btn-outline-secondary" 
                    type="submit"
                    
                >Button</button>
                </div>
            </div>

        </form>

        {isLoading ? ( 
            <p>Loading...</p>
        ) : response.length > 0 ? (
            <>
            <h2>Scraped Products:</h2>
            <ul  className="list-group">
                {response.map((e: Product, index) => (
                    <li className="list-group-item">
                        <a href={"https://www.hollandandbarrett.com"+e.link} target="_blank">
                            {e.name}
                        </a>
                    </li>
                ))}
            </ul>
            </>
        ) : null}
    </div>

  );
};

export default Products;
