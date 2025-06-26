import { NavLink } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import { useAuthStore } from '../store/authStore';
import { useState } from 'react';
import styles from './HouseGrid.module.css';

export default function HouseCardHeader({ postedBy, isFollowing, onFollowToggle, loadingFollow, showFollowButton }) {
  const currentUserId = useAuthStore(state => state.userId);
  const isOwner = postedBy?.id === currentUserId;

  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    if (!currentUserId) {
      setShowLoginMessage(true);
      setTimeout(() => setShowLoginMessage(false), 2000);
      return;
    }
    onFollowToggle(e);
  };

  return (
    <div className={styles.header}>
      <NavLink
        to={`/${postedBy.id}/${postedBy.username}`}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
      >
        {postedBy.profileImage ? (
          <img
            src={postedBy.profileImage}
            className={styles.profileImage}
            alt={`${postedBy.username}'s profile`}
          />
        ) : (
          <FaRegUser className={styles.profileImage} />
        )}
        <span className={styles.username}>{postedBy?.username || 'Anonymous'}</span>
      </NavLink>

      {showFollowButton && !isOwner && (
        <>
          <button
            onClick={handleClick}
            disabled={loadingFollow}
            className={`${styles.followButton} ${isFollowing ? styles.unfollowButton : ''}`}
          >
            {loadingFollow ? 'Loading...' : isFollowing ? 'Unfollow' : 'Follow'}
          </button>
          {showLoginMessage && (
            <div className={styles.loginMessage}>Please login to follow users</div>
          )}
        </>
      )}
    </div>
  );
}
