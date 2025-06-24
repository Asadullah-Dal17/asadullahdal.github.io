import streamlit as st
import os

# Set Streamlit to wide mode
st.set_page_config(layout="wide")


def load_css():
    with open("style.css") as f:
        st.markdown("<style>{}</style>".format(f.read()), unsafe_allow_html=True)


def load_basic_html(file_path: str):
    """
    Loads basic HTML content and renders it using st.markdown.
    Only supports limited HTML elements.

    Parameters:
    - file_path (str): Path to the HTML file.
    """
    if not os.path.exists(file_path):
        st.error(f"File not found: {file_path}")
        return

    with open(file_path, "r", encoding="utf-8") as file:
        html_content = file.read()

    # Display HTML with basic support
    st.markdown(html_content, unsafe_allow_html=True)


load_basic_html("index.html")
load_css()
