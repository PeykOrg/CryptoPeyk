import axios from 'axios';
import {useEffect, useState} from 'react';
import {Container, HStack, Button, RadioGroup, Radio} from '@chakra-ui/react';
import Loader from './Loader';
import CoinsCards from './CoinsCards';

function Coins() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState('usd');

  const currencySymblo =
    currency === 'usd' ? '$' : currency === 'eur' ? '€' : 'ریال';
  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };
  const btns = new Array(20).fill(1);
  useEffect(() => {
    const fetchCoins = async () => {
      const {data} = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&page=${page}`
      );
      setCoins(data);
      setLoading(false);
    };
    fetchCoins();
  }, [currency, page]);
  return (
    <Container maxW={'container.xl'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
            <HStack spacing={'4'}>
              <Radio value={'usd'}>USD</Radio>
              <Radio value={'eur'}>EUR</Radio>
            </HStack>
          </RadioGroup>

          <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
            {coins.map((i) => (
              <CoinsCards
                key={i.id}
                id={i.id}
                name={i.name}
                price={i.current_price}
                img={i.image}
                symbol={i.symbol}
                currencySymblo={currencySymblo}
              />
            ))}
          </HStack>

          <HStack w={'full'} overflow={'auto'} p={'8'}>
            {/* creat btns */}
            {btns.map((item, index) => (
              <Button
                key={index}
                bgColor={'whatsapp.400'}
                color={'blackAlpha.900'}
                onClick={() => changePage(index + 1)}>
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
}

export default Coins;
