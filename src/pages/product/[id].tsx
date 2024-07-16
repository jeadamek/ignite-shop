import { ImageContainer, ProductContainer, ProductDetails } from '@/src/styles/pages/product';
import { useRouter } from 'next/router';

export default function Product() {
  const { query } = useRouter();
  return (
    <ProductContainer>
      <ImageContainer>

      </ImageContainer>
      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,90</span>

        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem porro quas, et consectetur veritatis dolores soluta laudantium ea quis similique ab libero tempora placeat odit dolore iusto sit nisi ipsum.</p>
      
        <button>Comprar Agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}