type ImgProps = {
  src: string;
  alt: string;
  containerClass?: string;
  imgClass?: string;
};

function Img({ src, alt, containerClass = '', imgClass = '' }: ImgProps) {
  return (
    <div className={ containerClass }>
      <img src={ src } alt={ alt } className={ imgClass } />
    </div>
  );
}

export default Img;
