import { selectProducts} from './features/product/productSlice';
//redux
import {useSelector} from 'react-redux';

//MUI
import Grid from '@mui/material/Grid';

import ProductCard from "./features/product/productCard";

function HomePage(){
    const products = useSelector(selectProducts);

    return(
        <div>
            <Grid sx={{ flexGrow: 1,p:3 }} container >
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={5}>
                    {products.map((product) => (
                        <Grid key={product.bakeId} item>
                            <ProductCard
                                bakeId =  {product.bakeId}
                                bakeName = {product.bakeName}
                                described = {product.described}
                                image = {product.image}
                                price = {product.price}
                                quantity = {product.quantity}
                                recipe = {product.recipe}
                                userProfile = {product.userProfile}
                            />
                        </Grid>
                    ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default HomePage;