import { Droplet, Percent } from 'lucide-react';
import { Flex } from '../../../../common/Flex';

interface RelativeHumidityProps extends React.ComponentProps<typeof Droplet> {}

export const RelativeHumidity = ({ size = 24, ...props }: RelativeHumidityProps) => {
  return (
    <Flex
      items="center"
      justify="center"
      style={{ position: 'relative', width: size, height: size }}
    >
      <Droplet {...props} style={{ width: '100%' }} />
      <Percent
        {...props}
        size="36%"
        style={{
          position: 'absolute',
          marginTop: '25%',
          fill: props.color ?? 'white',
          color: props.color ?? 'white',
        }}
      />
    </Flex>
  );
};
