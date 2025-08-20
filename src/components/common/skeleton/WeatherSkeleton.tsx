import styles from './skeleton.module.css';

export const WeatherSkeleton = () => {
  return (
    <div className={styles.weatherSkeleton}>
      <div className={styles.skeletonBox}></div>
    </div>
  );
};
