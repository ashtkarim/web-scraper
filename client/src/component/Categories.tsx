import React, { useState, useEffect } from 'react';

interface Category {
    name: string;
    link: string;
}

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = 'http://4.233.16.88:4000/categories';
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data: Category[] = await response.json();
                setCategories(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching category data:', error);
            }
        };

        fetchData();
    }, []); 
    return (
        <div>
            <h1>Category List</h1>
            <h4>
                {categories.map((category, key) => (
                    <a key={key} href={category.link}>{category.name}</a>
                ))}
            </h4>
        </div>
    );
};

export default Categories;
