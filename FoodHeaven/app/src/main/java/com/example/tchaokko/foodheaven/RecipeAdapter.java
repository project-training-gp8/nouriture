package com.example.tchaokko.foodheaven;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import java.util.HashMap;

/**
 * Created by Victor-MSI on 07/01/2017.
 */

public class RecipeAdapter extends RecyclerView.Adapter<RecipeAdapter.Holder> {
    private HashMap<String, Integer> mItems;

    RecipeAdapter(HashMap<String, Integer> items) {
        mItems = items;
    }

    public static class Holder extends RecyclerView.ViewHolder {
        // Your holder should contain a member variable
        // for any view that will be set as you render a row
        public ImageView nameImageView;

        // We also create a constructor that accepts the entire item row
        // and does the view lookups to find each subview
        public Holder(View itemView) {
            // Stores the itemView in a public final member variable that can be used
            // to access the context from any ViewHolder instance.
            super(itemView);
            nameImageView = (ImageView) itemView.findViewById(R.id.nameImageView);
        }
    }

    @Override
    public Holder onCreateViewHolder(ViewGroup parent, int position) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.row, parent, false);
        return new Holder(view);
    }

    @Override
    public void onBindViewHolder(Holder holder, int position) {
        String key = (String) mItems.keySet().toArray()[position];
        holder.nameImageView.setImageResource(mItems.get(key));
    }

    @Override
    public int getItemCount() {
        return mItems.size();
    }
}
