package com.example.tchaokko.foodheaven;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ImageView;
import android.widget.RelativeLayout;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;


public class MainPage extends AppCompatActivity
{
    private EndlessRecyclerViewScrollListener scrollListener;
    private HashMap<String, Integer> mItems;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_page);
        RecyclerView rvItems = (RecyclerView)findViewById(R.id.recycle_main);
        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(this);
        rvItems.setLayoutManager(linearLayoutManager);
        try {
            ApiClassUsage.getRecipyHome(this);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        mItems = new HashMap<>();
        mItems.put("TRY", R.drawable.common_plus_signin_btn_icon_dark);
        mItems.put("PUT", R.drawable.common_google_signin_btn_icon_dark_disabled);
        mItems.put("L1OL", R.drawable.common_google_signin_btn_text_dark);
        mItems.put("LO2L", R.drawable.common_google_signin_btn_icon_dark);
        mItems.put("LOL3", R.drawable.common_google_signin_btn_text_dark);
        mItems.put("LOL4", R.drawable.common_google_signin_btn_text_dark);
        mItems.put("LOL5", R.drawable.common_google_signin_btn_text_dark);
        mItems.put("LOL6", R.drawable.common_google_signin_btn_text_dark);
        mItems.put("LOL7", R.drawable.common_google_signin_btn_text_dark);
        mItems.put("LOL8", R.drawable.common_google_signin_btn_text_dark);
        mItems.put("LOL9", R.drawable.common_google_signin_btn_text_dark);
        mItems.put("LOL01", R.drawable.common_google_signin_btn_text_dark);
        mItems.put("LOL12", R.drawable.common_google_signin_btn_text_dark);
        mItems.put("LOL564", R.drawable.common_google_signin_btn_text_dark);
        mItems.put("LOL4546", R.drawable.common_google_signin_btn_text_dark);
        mItems.put("LOL4898", R.drawable.common_google_signin_btn_text_dark);


        RecipeAdapter mAdapter = new RecipeAdapter(mItems);

        rvItems.setAdapter(mAdapter);


        scrollListener = new EndlessRecyclerViewScrollListener(linearLayoutManager)
        {
            @Override
            public void onLoadMore(int page, int totalItemsCount, RecyclerView view)
            {
                // Triggered only when new data needs to be appended to the list
                loadNextDataFromApi(page);
            }
        };
        // Adds the scroll listener to RecyclerView
        rvItems.addOnScrollListener(scrollListener);
    }

    // Append the next page of data into the adapter
    // This method probably sends out a network request and appends new data items to your adapter.
    public void loadNextDataFromApi(int offset) {
        // Send an API request to retrieve appropriate paginated data
        //  --> Send the request including an offset value (i.e `page`) as a query parameter.
        //  --> Deserialize and construct new model objects from the API response
        //  --> Append the new data objects to the existing set of items inside the array of items
        //  --> Notify the adapter of the new items made with `notifyItemRangeInserted()`
    }
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_date_picker, menu);
        return true;
    }
    public void affHome(JSONArray array){
        
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}