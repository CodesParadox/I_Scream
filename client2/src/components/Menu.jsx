export default function Menu({ items }) {
    return (
        <div>
            {items.map((item, index) => (
                <div key={index}>
                    <span onClick={item.command} role='button'>{item.label}</span>
                    <div className="ms-3">
                        {item.children && <Menu items={item.children} />}
                    </div>
                </div>
            ))}
        </div>
    )
}
