import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize, X } from "lucide-react";
import { useState } from "react";
import styles from "../../styles/utils/carousel.module.scss";

export default function Carousel({ media = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const prev = () =>
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? media.length - 1 : prevIndex - 1
    );

  const next = () =>
    setCurrentIndex((prevIndex) =>
      prevIndex === media.length - 1 ? 0 : prevIndex + 1
    );

  const current = media[currentIndex];

  const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);
  const isYoutube = (url) =>
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)/i.test(url);

  const getYoutubeId = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
    return match ? match[1] : null;
  };

  return (
    <>
      <div className={styles.carousel}>
        {isYoutube(current.url) ? (
          <iframe
            key={current.url}
            className={styles.media}
            src={`https://www.youtube.com/embed/${getYoutubeId(current.url)}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : isVideo(current.url) ? (
          <video
            key={current.url}
            src={current.url}
            className={styles.media}
            controls
          />
        ) : (
          <Image
            key={current.url}
            src={current.url}
            alt={`Slide ${currentIndex + 1}`}
            layout="fill"
            objectFit="cover"
            className={styles.media}
            priority
          />
        )}

        {media.length > 1 && (
          <>
            <button
              onClick={prev}
              className={`${styles.navButton} ${styles.left}`}
            >
              <ChevronLeft />
            </button>
            <button
              onClick={next}
              className={`${styles.navButton} ${styles.right}`}
            >
              <ChevronRight />
            </button>
          </>
        )}

        {!isYoutube(current.url) && !isVideo(current.url) && (
          <button
            onClick={() => setIsModalOpen(true)}
            className={styles.expandButton}
          >
            <Maximize size={20} />
          </button>
        )}
        
        {media.length > 1 && (
          <div className={styles.indicators}>
            {media.map((_, i) => (
              <div
                key={i}
                className={`${styles.dot} ${i === currentIndex ? styles.active : ""}`}
              />
            ))}
          </div>
        )}

      </div>

      {/* Modal */}
      {isModalOpen && !isVideo(current.url) && !isYoutube(current.url) && (
        <div className={styles.modal}>
          <button
            className={styles.closeButton}
            onClick={() => setIsModalOpen(false)}
          >
            <X size={24} />
          </button>
         <div className={styles.modalContent}>
          {current.width && current.height ? (
            <Image
              key={current.url}
              src={current.url}
              alt={`Slide ${currentIndex + 1}`}
              width={current.width}
              height={current.height}
              objectFit="cover"
              className={styles.media}
              priority
            />
          ) : (
            <div className={styles.imageWrapper}>
              <Image
                key={current.url}
                src={current.url}
                alt={`Slide ${currentIndex + 1}`}
                layout="fill"
                objectFit="cover"
                className={styles.media}
                priority
              />
            </div>
          )}
        </div>

      </div>
      )}
    </>
  );
}
