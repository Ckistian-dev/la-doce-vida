import { useState, useEffect } from 'react';

// --- CONFIGURAÇÕES DA SUA PLANILHA ---
const SPREADSHEET_ID = '1cJXc3Z8E_Hy2yNbdSCulRriIC0Pty9OkCr9ifPDGrm0';
const SHEET_NAME = 'Produtos';
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY; // Para Vite
// const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY; // Para Create React App

const URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}&valueRenderOption=FORMULA`;

const extractImageUrl = (cellValue) => {
    if (typeof cellValue !== 'string') return cellValue;
    const match = cellValue.match(/=IMAGE\("([^"]+)"\)/);
    return match ? match[1] : cellValue;
};

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(URL);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error.message || 'Falha ao buscar dados da planilha. Verifique a Chave de API e as configurações.');
                }

                const data = await response.json();
                const [headerRow, ...rows] = data.values;
                const headers = headerRow.map(h => h.toLowerCase().replace(/\s*\(.*\)\s*/g, '').trim());

                const formattedProducts = rows.map(row => {
                    const productObject = {};
                    headers.forEach((header, index) => {
                        productObject[header] = row[index];
                    });

                    const productType = productObject.type;
                    const productPrice = parseFloat(String(productObject.price).replace(',', '.')) || 0;

                    let structuredOptions = [];
                    const optionsString = productObject.options;
                    if (optionsString && typeof optionsString === 'string') {
                        structuredOptions = optionsString.split(',')
                            .map(label => label.trim())
                            .filter(label => label)
                            .map(label => {
                                const option = {
                                    id: label.toLowerCase().replace(/\s+/g, '-'),
                                    label: label
                                };
                                if (productType === 'by_weight') {
                                    option.pricePerKg = productPrice;
                                }
                                return option;
                            });
                    }
                    
                    const finalImageUrl = extractImageUrl(productObject.imageurl);
                    
                    return {
                        id: parseInt(productObject.id),
                        name: productObject.name,
                        description: productObject.description,
                        category: productObject.category,
                        imageurl: finalImageUrl,
                        // --- LINHA CORRIGIDA ---
                        isFeatured: String(productObject.isfeatured).toLowerCase() === 'true',
                        type: productType,
                        price: productPrice,
                        minWeight: parseInt(productObject.minweight),
                        maxWeight: parseInt(productObject.maxweight),
                        maxSelections: parseInt(productObject.maxselections),
                        options: structuredOptions,
                    };
                });
                
                setProducts(formattedProducts);

            } catch (err) {
                console.error("Erro no fetchProducts:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
};

export default useProducts;