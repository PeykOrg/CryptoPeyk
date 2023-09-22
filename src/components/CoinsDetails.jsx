import axios from 'axios';
import {useParams} from 'react-router-dom';
import {
  Box,
  Container,
  HStack,
  RadioGroup,
  Radio,
  VStack,
  Text,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Progress,
  Button,
} from '@chakra-ui/react';
import Chart from './Chart';
import Loader from './Loader';
import {useEffect, useState} from 'react';

function CoinsDetails() {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState('usd');
  const [days, setDays] = useState('24h');
  const [chartArray, setChartArray] = useState('24h');

  const currencySymblo =
    currency === 'usd' ? '$' : currency === 'eur' ? '€' : '';

  const params = useParams();
  const btns = ['24h', '7d', '14d', '30d', '60d', '200d', '1y', 'max'];
  const switchChartstats = (key) => {
    switch (key) {
      case '24h':
        setDays('24h');
        setLoading(true);
        break;
      case '7d':
        setDays('7d');
        setLoading(true);
        break;
      case '14d':
        setDays('14d');
        setLoading(true);
        break;
      case '30d':
        setDays('30d');
        setLoading(true);
        break;
      case '60d':
        setDays('60d');
        setLoading(true);
        break;
      case '200d':
        setDays('200d');
        setLoading(true);
        break;
      case '1y':
        setDays('1y');
        setLoading(true);
        break;
      case 'max':
        setDays('max');
        setLoading(true);
        break;
      default:
        setDays('24h');
        setLoading(true);
        break;
    }
  };

  useEffect(() => {
    const fetchCoin = async () => {
      const {data} = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${params.id}`
      );

      const {data: chartData} = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
      );
      setCoin(data);
      setChartArray(chartData.prices);
      setLoading(false);
    };
    fetchCoin();
  }, [params.id, currency, days]);

  return (
    <Container maxW={'container.xl'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box width={'full'} borderWidth={1}>
            <Chart arr={chartArray} currency={currencySymblo} days={days} />
          </Box>

          <HStack P={4} wrap={'w'}>
            {btns.map((i) => (
              <Button key={1} onClick={() => switchChartstats(i)}>
                {i}
              </Button>
            ))}
          </HStack>

          <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
            <HStack spacing={'4'}>
              <Radio value={'usd'}>USD</Radio>
              <Radio value={'eur'}>EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={'4'} padding={'16'} alignItems={'flex-start'}>
            <Text fontSize={'small'} alignSelf={'center'}>
              last updated {Date(coin.market_data.last_updated).split('G')[0]}
            </Text>
            <Image
              src={coin.image.large}
              w={'16'}
              h={'16'}
              objectFit={'contain'}
            />
            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymblo}
                {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? 'increase'
                      : 'decrease'
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>
            <Badge fontSize={'2xl'} bgColor={'blackAlpha.800'} color={'white'}>
              {`#${coin.market_cap_rank}`}
            </Badge>

            <CustomBar
              high={`${currencySymblo}${coin.market_data.high_24h[currency]}`}
              low={`${currencySymblo}${coin.market_data.low_24h[currency]}`}
              coin={coin.market_data.price_change_percentage_24h}
            />

            <Box w={'full'} P={'4'}>
              <Item title={'Max supply'} value={coin.market_data.max_supply} />

              <Item
                title={'Circulating supply'}
                value={coin.market_data.circulating_supply}
              />

              <Item
                title={'Market Cap'}
                value={`${currencySymblo}${coin.market_data.market_cap[currency]}`}
              />

              <Item
                title={'All Time Low'}
                value={`${currencySymblo}${coin.market_data.atl[currency]}`}
              />

              <Item
                title={'All Time High'}
                value={`${currencySymblo}${coin.market_data.ath[currency]}`}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
}

const Item = ({title, value}) => {
  return (
    <HStack justifyContent={'space-between'} w={'full'} my={'4 '}>
      <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}>
        {title}
      </Text>
      <Text fontSize={'Bebas Neue'}>{value}</Text>
    </HStack>
  );
};

/* const priceChange = coin.market_data.price_change_percentage_24h;
console.log(priceChange); */

const CustomBar = ({high, low, coin}) => {
  return (
    <VStack w={'full'}>
      <Progress
        value={coin}
        colorScheme={coin > 0 ? 'green' : 'red'}
        w={'full'}
      />
      <HStack justifyContent={'space-between'} w={'full'}>
        <Badge children={low} colorScheme={'red'} />
        <Text fontSize={'sm'}>24H Range</Text>
        <Badge children={high} colorScheme={'green'} />
      </HStack>
    </VStack>
  );
};

// پنج ساعت و 51 دقیقه و 41 ثانیه

export default CoinsDetails;
