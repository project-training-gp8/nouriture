package com.example.tchaokko.foodheaven;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.app.DialogFragment;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.DatePicker;
import android.widget.EditText;

public class RegisterActivity2 extends AppCompatActivity {

    int year;
    int month;
    int day;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register2);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
        EditText email = (EditText)findViewById(R.id.Email);
        EditText password = (EditText)findViewById(R.id.Password);
        EditText confirmPassword = (EditText)findViewById(R.id.confirmPassworrd);
        EditText firstName = (EditText)findViewById(R.id.FistName);
        EditText lastName = (EditText)findViewById(R.id.LastName);
        int year;
        int month;
        int day;
            }
        });
    }

    public void fillDateBirthday(DatePicker date){
        this.year = date.getYear();
        this.month = date.getMonth();
        this.day = date.getDayOfMonth();
    }

    public void showDatePickerDialog(View v) {
        DialogFragment newFragment = new DatePickerFragment();
        newFragment.show(getSupportFragmentManager(), "datePicker");
    }

    public void launchRegistration(View v) {

    }
}
