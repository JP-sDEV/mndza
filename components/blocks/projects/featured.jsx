// import Image from 'next/image'

// import { useEffect, useState } from 'react'
// import { m, useAnimation } from "framer-motion"
// import { useInView } from 'react-intersection-observer'

// import Badges 		from '../../utils/badge.list.util'
// import Icon 		from '../../utils/icon.util'

// import css 			from '../../../styles/sections/projects/featured.module.scss'
// import content 		from '../../../content/projects/featured.json'

// export default function FeaturedProject({ content }, index) {

// 	const { project, url, repo, descriptionTitle,description, stack, imageOptions, images } = content

// 	// Modal State
// 	 // State for modal
// 	 const [modalOpen, setModalOpen] = useState(false);
// 	 const [modalImage, setModalImage] = useState(null);


// 	const controls = useAnimation();
// 	const { ref, inView  } = useInView({
// 		"threshold": 0.25,
// 		"triggerOnce": false
// 	})

// 	useEffect( () => {
// 		if ( inView ) {	controls.start("visible") }
// 		if ( !inView ) { controls.start("hidden") }
// 	}, [ controls, inView ] )

// 	// Modal Controls
// 	const openModal = (imageUrl, h, w) => {
// 		console.log("OPEN MODAL")
// 		setModalImage(imageUrl);
// 		setModalOpen(true);
// 	};

// 	// Function to close modal
// 	const closeModal = () => {
// 		setModalOpen(false);
// 		setModalImage(null);
// 	};

// 	return (
// 		<m.section 	
// 			key={index}
// 			className={css.project} 
// 			//framer-motion
// 			ref={ref}
// 			variants={container}
// 			initial={[ "rest", "hidden" ]}
// 			whileHover="hover"
// 			animate={controls} >
			
// 			<div className={css.details}>
// 				<div className={css.projectHeader}>
// 					<div className={css.header}>
// 						<h3 className="highlight">{project}</h3>
// 					</div>
// 					<div className={css.descriptionTitle}>
// 						<p className={css.description}>{description}</p>
// 					</div>
// 					<div className={css.stackContainer}>
// 						<Badges list={stack} block="stack" fullContainer={false} color={false} />
// 					</div>
// 					<m.div variants={''} className={css.viewProject}>
// 						{/* <Icon icon={[ 'fad', 'expand' ]} /> */}
// 					</m.div>
// 				</div>
// 			</div>

// 			<div className={css.imageContainer}>
// 				<span className={`${css.imageAnimationContainer}`}>

// 					{ images.map( ({key, url, hover, h, w }, index) => {
// 						hover = ( hover === 'left' ) ? hoverLeft : hoverRight
// 						return (
// 							<m.div key={`${index}-${key}`} variants={item}>
// 								<m.div variants={hover}>
// 									<Image 
// 										src={url} 
// 										alt="x" 
// 										height={h} 
// 										width={w}  
// 										onClick={() => openModal(url, h , w)}/>
// 								</m.div>
// 							</m.div>
// 						)}
// 					) }
// 				</span>
// 			</div>


// 			{modalOpen && (
//         <div className={css.modalOverlay} onClick={closeModal}>
//           <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
//             <Image src={modalImage} alt="Full resolution" height={h} width={w} />
//             <button className={css.closeButton} onClick={closeModal}>Close</button>
//           </div>
//         </div>
//       )}
// 		</m.section>
// 	)
// }

// const container = {
// 	hidden: { 
// 		transition: {
// 			delayChildren: 0.125,
// 			staggerChildren: 0.0625
// 		}
// 	},
// 	visible: {
// 		transition: {
// 			delayChildren: 0.125,
// 			staggerChildren: 0.25,
// 		}
// 	},
// 	rest: {
// 		transition: {
// 			delayChildren: 0,
// 			staggerChildren: 0,
// 		}
// 	},
// 	hover: {
// 		transition: {
// 			delayChildren: 0,
// 			staggerChildren: 0,
// 		}
// 	}
// }

// const item = {
// 	hidden: { 
// 		y: 75, 
// 		opacity: 0,
// 		transition: {
// 			type: "tween",
// 			ease: "easeIn",
// 			duration: .35, 
// 		}
// 	},
// 	visible: {
// 		y: 0,
// 		opacity: 1,
// 		transition: {
// 			type: "tween",
// 			ease: "easeOut",
// 			duration: .5, 
// 		}
// 	},
// }

// const hoverLeft = {
// 	rest: {
// 		x: 0
// 	},
// 	hover: {
// 		x: -20
// 	}
// }

// const hoverRight = {
// 	rest: {
// 		x: 0
// 	},
// 	hover: {
// 		x: 20
// 	}
// }

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { m, useAnimation } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import Badges from '../../utils/badge.list.util';
import css from '../../../styles/sections/projects/featured.module.scss';

export default function FeaturedProject({ content }, index) {

	const { project, description, stack, images } = content;

	// Modal State
	const [modalOpen, setModalOpen] = useState(false);
	const [modalImage, setModalImage] = useState({ url: null, h: 0, w: 0 });

	const controls = useAnimation();
	const { ref, inView } = useInView({
		threshold: 0.25,
		triggerOnce: false
	});

	useEffect(() => {
		if (inView) {
			controls.start("visible");
		}
		if (!inView) {
			controls.start("hidden");
		}
	}, [controls, inView]);

	// Modal Controls
	const openModal = (imageUrl, h, w) => {
		setModalImage({ url: imageUrl, h, w });
		setModalOpen(true);
	};

	// Function to close modal
	const closeModal = () => {
		setModalOpen(false);
		setModalImage({ url: null, h: 0, w: 0 });
	};

	return (
		<m.section
			key={index}
			className={css.project}
			ref={ref}
			variants={container}
			initial={["rest", "hidden"]}
			whileHover="hover"
			animate={controls}
		>
			<div className={css.details}>
				<div className={css.projectHeader}>
					<div className={css.header}>
						<h3 className="highlight">{project}</h3>
					</div>
					<div className={css.descriptionTitle}>
						<p className={css.description}>{description}</p>
					</div>
					<div className={css.stackContainer}>
						<Badges list={stack} block="stack" fullContainer={false} color={false} />
					</div>
				</div>
			</div>

			<div className={css.imageContainer}>
				<span className={`${css.imageAnimationContainer}`}>
					{images.map(({ key, url, hover, h, w }, index) => {
						const hoverClass = hover === 'left' ? hoverLeft : hoverRight;
						return (
							<m.div key={`${index}-${key}`} variants={item}>
								<m.div variants={hoverClass}>
									<Image
										src={url}
										alt="x"
										height={h}
										width={w}
										onClick={() => openModal(url, h, w)}
									/>
								</m.div>
							</m.div>
						);
					})}
				</span>
			</div>

			{/* Modal for the Image */}
			{modalOpen && (
				<div className={css.modalOverlay} onClick={closeModal}>
					<div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
						<Image
							src={modalImage.url}
							alt="Full resolution"
							height={modalImage.h}
							width={modalImage.w}
						/>
						<button className={css.closeButton} onClick={closeModal}>Close</button>
					</div>
				</div>
			)}
		</m.section>
	);
}

const container = {
	hidden: {
		transition: {
			delayChildren: 0.125,
			staggerChildren: 0.0625
		}
	},
	visible: {
		transition: {
			delayChildren: 0.125,
			staggerChildren: 0.25,
		}
	},
	rest: {
		transition: {
			delayChildren: 0,
			staggerChildren: 0,
		}
	},
	hover: {
		transition: {
			delayChildren: 0,
			staggerChildren: 0,
		}
	}
};

const item = {
	hidden: {
		y: 75,
		opacity: 0,
		transition: {
			type: "tween",
			ease: "easeIn",
			duration: .35,
		}
	},
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: "tween",
			ease: "easeOut",
			duration: .5,
		}
	},
};

const hoverLeft = {
	rest: {
		x: 0
	},
	hover: {
		x: -20
	}
};

const hoverRight = {
	rest: {
		x: 0
	},
	hover: {
		x: 20
	}
};
