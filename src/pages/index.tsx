import Image from "next/image";
import { HomeContainer, Product } from "../styles/pages/home";

import shirt1 from '../assets/camisetas/Shirt-1.png';
import shirt2 from '../assets/camisetas/Shirt-2.png';
import shirt3 from '../assets/camisetas/Shirt-3.png';
import shirt4 from '../assets/camisetas/Shirt-4.png';

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={shirt1} width={530} height={480} alt="" />

        <footer>
          <strong> Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </ Product>

      <Product>
        <Image src={shirt2} width={530} height={480} alt="" />

        <footer>
          <strong> Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </ Product>
    </HomeContainer>
  );
}
