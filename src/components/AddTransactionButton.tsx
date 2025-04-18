
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { useBudget } from '@/contexts/BudgetContext';
import { Category, CATEGORIES } from '@/types/budget';
import { toast } from 'sonner';

const AddTransactionButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category | ''>('');
  const [description, setDescription] = useState('');
  
  const { addTransaction } = useBudget();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !category || !description) {
      toast.error('Please fill in all fields');
      return;
    }

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    addTransaction({
      amount: amountValue,
      category: category as Category,
      description,
      date: new Date(),
    });

    toast.success('Transaction added successfully');
    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setAmount('');
    setCategory('');
    setDescription('');
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)} 
        className="fixed bottom-6 right-6 flex gap-2 rounded-full shadow-lg"
      >
        <Plus className="h-5 w-5" />
        <span>Add Transaction</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  className="pl-7"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={(value) => setCategory(value as Category)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(CATEGORIES).map((cat) => (
                    <SelectItem key={cat.name} value={cat.name}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="What was this expense for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Transaction</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddTransactionButton;
