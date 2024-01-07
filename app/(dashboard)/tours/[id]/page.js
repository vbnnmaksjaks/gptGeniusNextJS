import TourInfo from '@/components/TourInfo';

import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import prisma from '@/utils/db';
const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;

const SingleTourPage = async ({ params }) => {
  const tour = await prisma.tour.findUnique({
    where: {
      id: params.id,
    },
  });

  const { data } = await axios(`${url}${tour.city}`);
  const tourImage = data?.results[0]?.urls?.raw;

  // const tourImage = await generateTourImage({
  //   city: tour.city,
  //   country: tour.country,
  // });
  return (
    <div>
      <Link href='/tours' className='btn btn-secondary mb-12'>
        back to tours
      </Link>

      {tourImage ? (
        <div>
          <Image
            src={tourImage}
            width={300}
            height={300}
            className='rounded-xl shadow-xl mb-16 h-96 w-96 object-cover'
            alt={tour.title}
            priority
          />
        </div>
      ) : null}

      <TourInfo tour={tour} />
    </div>
  );
};
export default SingleTourPage;