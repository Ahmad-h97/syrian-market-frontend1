import styles from './Loading.module.css';

export default function Loading() {
 return (
    <div className={styles.dotsloader}>
  <span></span><span></span><span></span>
</div>
  );
}