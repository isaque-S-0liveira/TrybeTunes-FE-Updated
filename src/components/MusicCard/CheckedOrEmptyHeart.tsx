function CheckedOrEmptyHeart({ checked }: { checked: boolean }) {
  return (
    checked ? (
      <i id="checked-heart" className="bi bi-heart-fill" />
    ) : (
      <i id="emptyHeart" className="bi bi-heart" />
    )
  );
}

export default CheckedOrEmptyHeart;
