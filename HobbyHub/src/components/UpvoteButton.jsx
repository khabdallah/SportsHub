// src/components/UpvoteButton.jsx
import React from 'react';
import { supabase } from '../supabaseClient';

export default function UpvoteButton({ postId, currentCount, onUpvoted }) {
  const handleClick = async (e) => {
    e.preventDefault();

    const { data, error, status } = await supabase
      .from('posts')
      .update({ upvotes: currentCount + 1 })
      .eq('id', postId)
      .select()        // ← request the updated row
      .single();      // ← assert exactly one row comes back

    if (error) {
      console.error('Upvote error:', error);
    } else {
      // status will now be 200, and `data` is the updated post object
      onUpvoted(data);
    }
  };

  return (
    <button
      type="button"
      className="upvote-button"
      onClick={handleClick}
    >
      ▲ {currentCount}
    </button>
  );
}
