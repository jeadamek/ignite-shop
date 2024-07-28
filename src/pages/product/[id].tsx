import axios from 'axios';
import { useState } from 'react';
import { ImageContainer, ProductContainer, ProductDetails } from '@/src/styles/pages/product';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import Stripe from 'stripe';
import { stripe } from '@/src/lib/stripe';
import Image from 'next/image';

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  }
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter();
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

  if (isFallback) {
    return <p>Loading...</p>
  }

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl
    } catch (err) {
      // Conectar com uma ferramenta de observabilidade (datadog / Sentry)
      setIsCreatingCheckoutSession(false);
      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>
      
        <button 
          onClick={handleBuyProduct}
          disabled={isCreatingCheckoutSession}
        >
          Comprar Agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_QTA4HicidjgH7L'} }
    ],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params!.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price;
  
  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format((price.unit_amount || 0) / 100),
        description: product.description,
        defaultPriceId: price.id,
      }
    },
    revalidate: 60 * 60,
  }
}
