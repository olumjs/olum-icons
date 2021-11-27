#! /bin/bash
# script must be inside svg directory
CATEGORY="solid" # change the value with the folder you want to prefix
FILES=$(ls $CATEGORY *)

cd $CATEGORY
for FILE in $FILES
  do 
    mv $FILE $CATEGORY-$FILE
done