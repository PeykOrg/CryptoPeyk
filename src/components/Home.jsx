import {Box, Image} from '@chakra-ui/react';
import logo from './assets/logo2.png';
import {motion} from 'framer-motion';
function Home() {
  return (
    <div>
      <Box bgColor={'blackAlpha.900'} w={'full'} h={'100vh'}>
        <motion.div
          style={{
            height: '80vh',
          }}
          animate={{
            translateY: '20px',
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: 'reverse',
          }}>
          <Image
            w={'full'}
            h={'full'}
            objectFit={'contain'}
            src={logo}
            filter={'grayscale(1)'}
          />
        </motion.div>
      </Box>
    </div>
  );
}

export default Home;
