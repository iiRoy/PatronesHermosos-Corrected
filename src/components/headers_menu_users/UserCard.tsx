import Image from 'next/image';

const UserCard = ({ type }: { type: string }) => {
    return (
        <div className='rounded-2xl bg-white odd:text-primaryShade even:text-secondaryShade p-4 flex-1 min-w-[130px]'>
            <div className='flex justify-between items-center'>
                <span className='text-[10px] bg-primary px-2 py-1 rounded-full text-text opacity-80'>
                    2025/03
                </span>
                <Image src='/moreDark.png' alt='' width={20} height={20} />
            </div>
            <h1 className='text-3xl font-bold mt-3 mb-1'>1,234</h1>
            <h2 className='capitalize text-xs font-medium opacity-80'>
                {type}
            </h2>
        </div>
    );
};

export default UserCard;
