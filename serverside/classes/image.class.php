<?php 

  /**
   *  Prevents direct access to file 
   */

  if (basename($_SERVER['PHP_SELF']) == basename(__FILE__)) {
    exit('Direct access denied');
  }


  require_once('database.class.php');

  /**
   *  Images handling 
   */

  class Image extends Database {

    /**
     *  Returns all paintings 
     *
     *  @param	boolean	distinguish between portraits or pictures (possible values 1, 0, true, false) 
     *  @param	string	distinguish between pictures from book and other paintings 
     *  @return	array 
     */

    public function get_paintings($portraits, $book) {
      $portraits = $portraits == 'true' ? true : false;
      return $this->select('paintings', 'name, description, portrait, deleted, desktop, laptop, tablet, mobile')
        ->where('portrait', $portraits, '==', $this->table_content)
        ->where('deleted', 0, '==', $this->table_content_filtered)
        ->where('mobile', $book, 'LIKE', $this->table_content_filtered)
        ->table_content_filtered;
    }

    /**
     *  Returns filtered paintings 
     *
     *  @param	string	searchedvalue 
     *  @param	boolean	distinguish between portraits or pictures (possible values 1, 0, true, false) 
     *  @return	array 
     */

    public function get_filtered_paintings($searched_value, $portraits = true) {
      return $this->select('paintings', 'name, description, portrait, deleted, desktop, laptop, tablet, mobile')
        ->where('portrait', $portraits, '==', $this->table_content)
        ->where('deleted', 0, '==', $this->table_content_filtered)
        ->where('name', $searched_value, 'LIKE', $this->table_content_filtered)
        ->table_content_filtered;
    }

  }
