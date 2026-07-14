interface AvatarProps {
  name: string;
  image?: string;
}

export default function Avatar({
  name,
  image,
}: AvatarProps) {
  return image ? (
    <img
      src={image}
      alt={name}
      className="h-10 w-10 rounded-full object-cover"
    />
  ) : (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white">
      {name.charAt(0)}
    </div>
  );
}