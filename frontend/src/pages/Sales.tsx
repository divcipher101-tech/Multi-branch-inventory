import { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, CreditCard, Banknote, Search, CheckCircle } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import './Sales.css';

export default function Sales() {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'CARD' | 'TRANSFER'>('CASH');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch available inventory items that are in stock
  useEffect(() => {
    fetch('http://localhost:5000/api/inventory')
      .then(res => res.json())
      .then(data => {
        // Only show items with stock
        const available = data.filter((item: any) => item.quantity > 0).map((item: any) => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.sellingPrice,
          stock: item.quantity,
          sku: item.product.sku,
          category: item.product.category
        }));
        setProducts(available);
      })
      .catch(err => console.error(err));
  }, []);

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) return prev; // Cannot add more than stock
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + delta;
        if (newQ < 1) return item;
        if (newQ > item.stock) return item;
        return { ...item, quantity: newQ };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setIsProcessing(true);

    try {
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      
      const payload = {
        userId: user?.id,
        branchId: 'dummy-branch', 
        items: cart.map(c => ({ productId: c.id, quantity: c.quantity, price: c.price })),
        method: paymentMethod
      };

      const inventoryRes = await fetch('http://localhost:5000/api/inventory');
      const inventoryData = await inventoryRes.json();
      if(inventoryData.length > 0) {
        payload.branchId = inventoryData[0].branchId;
      }

      const res = await fetch('http://localhost:5000/api/sales/record', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Checkout failed');

      setSuccess(true);
      setCart([]);
      
      // Update local product stock visually
      const updatedProducts = products.map(p => {
        const cartItem = cart.find(c => c.id === p.id);
        if (cartItem) return { ...p, stock: p.stock - cartItem.quantity };
        return p;
      });
      setProducts(updatedProducts);

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Checkout failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PageLayout title="Point of Sale" subtitle="Lightning fast checkout for retail and wholesale.">
      <div className="pos-container">
        {/* Left side: Product Grid */}
        <div className="pos-products">
          <div className="pos-header">
            <h2>Products</h2>
            <div className="search-bar">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card" onClick={() => addToCart(product)}>
                <div className="product-category">{product.category}</div>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">₦{product.price.toLocaleString()}</div>
                <div className="product-stock text-muted text-sm">{product.stock} in stock</div>
              </div>
            ))}
            {filteredProducts.length === 0 && <p className="text-muted">No products found or in stock.</p>}
          </div>
        </div>

        {/* Right side: Cart */}
        <div className="pos-cart">
          <div className="cart-header">
            <ShoppingCart size={20} />
            <h3>Current Order</h3>
          </div>

          <div className="cart-items">
            {cart.length === 0 ? (
              <div className="empty-cart">
                <ShoppingCart size={48} className="text-muted mb-4" />
                <p>Cart is empty</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p className="text-muted">₦{item.price.toLocaleString()}</p>
                  </div>
                  <div className="item-controls">
                    <button onClick={() => updateQuantity(item.id, -1)}><Minus size={14} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} disabled={item.quantity >= item.stock}><Plus size={14} /></button>
                  </div>
                  <div className="item-total font-semibold">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </div>
                  <button className="remove-item" onClick={() => removeFromCart(item.id)}>×</button>
                </div>
              ))
            )}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
            <div className="summary-row font-bold total-row">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>

            <div className="payment-methods mt-4">
              <button 
                className={`pay-btn ${paymentMethod === 'CASH' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('CASH')}
              >
                <Banknote size={18} /> Cash
              </button>
              <button 
                className={`pay-btn ${paymentMethod === 'CARD' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('CARD')}
              >
                <CreditCard size={18} /> Card
              </button>
            </div>

            <button 
              className={`btn-primary btn-block mt-4 ${success ? 'btn-success' : ''}`}
              disabled={cart.length === 0 || isProcessing}
              onClick={handleCheckout}
            >
              {isProcessing ? 'Processing...' : success ? <><CheckCircle size={18} className="inline mr-2"/> Payment Complete</> : `Charge ₦${total.toLocaleString()}`}
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
